 const FetchProducts = async (offset, limit) => {
    return await fetch(`https://fakestoreapi.com/products/`).then((data) => data.json())
}
export default FetchProducts