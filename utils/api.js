export const getTodoListFromAPI = async () => {
    const result = await fetch('https://blackcoffee-todolist.df.r.appspot.com/api/u/sky/item');
    console.log(result);
}