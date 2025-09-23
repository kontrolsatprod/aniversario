import axios from 'axios';

const get_sales_id = async (product_id) => {
  try {
    // Making the request with axios
    const response = await axios.get(`https://www.kontrolsat.com/custom/sales/get_sales_id_category_master.php`, {
      params: {
        id: product_id,  // Passing the product_id as a query parameter
      },
    });

    // Handle the response data
    const data = response.data;

    // You can process the data as per your needs
    return data; // Return the sales data or a specific field, e.g. data.salePrice
  } catch (error) {
    console.error('Error fetching sales data:', error);
    return null; // Return null or some fallback value in case of an error
  }
};


export default get_sales_id