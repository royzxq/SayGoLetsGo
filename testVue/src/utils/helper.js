
export function printResponse(text, data){
    console.log(text);
    console.log(data);
}

export function checkField(target, data){
  for (var item of target){
    if (! item in data){
      return false;
    }
  }
  return true;
}