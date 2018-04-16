from .models import *


def get_balances(expenses):
    debts = {}
    for expense in expenses:
        paid_user = expense.paid_member.user
        paid2users = expense.paid2users.all()
        size = len(paid2users)
        exp = expense.expense
        if size != 0 and exp != 0:
            val = expense.expense / len(paid2users)
            if not paid_user.id in debts:
                debts[paid_user.id] = 0
            debts[paid_user.id] -= exp
            for paid2user in paid2users:
                if not paid2user.id in debts:
                    debts[paid2user.id] = 0
                debts[paid2user.id] += val

        balance = []
    for i in debts:
        balance.append([i, debts[i]])
    return balance


def compute_payment(travel_group_id):
    expenses = Expense.objects.filter(paid_member__travel_group__id=travel_group_id)
    balance = get_balances(expenses)
    print(balance)
    payments = []
    res = find_min_transfer(balance, payments, 0, 0)
    print(res)
    print(payments)
    return payments


def find_min_transfer(balance, payments, pos, count):
    n = len(balance)
    for i in range(pos, n):
        if abs(balance[i][1]) <= 0.1:
            balance[i][1] = 0
        else:
            pos = i
            break
    else:
        return count

    res = 9999
    for i in range(pos + 1, n):
        if balance[pos][1] * balance[i][1] < 0:
            balance[i][1] += balance[pos][1]
            if balance[pos][1] > 0:
                payments.append([balance[pos][0], balance[i][0], round(balance[pos][1], 2)])
            else:
                payments.append([balance[i][0], balance[pos][0], round(-balance[pos][1], 2)])
            ret = find_min_transfer(balance, payments, pos + 1, count + 1)
            if ret < res:
                res = ret
            else:
                payments.pop()
                balance[i][1] -= balance[pos][1]
    return res
