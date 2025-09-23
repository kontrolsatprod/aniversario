import axios from 'axios';

const getSalesData = async () => {
  const endpoint = 'https://www.kontrolsat.com/custom/sales/get_sales_category_master.php';

  try {
    const response = await axios.get(endpoint);
    if (response.status === 200) {
      const products = response.data;

      // Extract unique breadcrumbs[0]
      const categories = Array.from(
        new Map(
          products
            .map((product) => product.breadcrumbs[0]) // Get breadcrumbs[0]
            .map((breadcrumb) => [breadcrumb.name, breadcrumb]) // Map by unique name
        ).values()
      );

      return { products, categories };
    } else {
      console.error(`Failed to fetch sales data: ${response.status}`);
      return { products: [], categories: [] };
    }
  } catch (error) {
    console.error('Error fetching sales data:', error);
    return { products: [], categories: [] };
  }
};

export default getSalesData;
