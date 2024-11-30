const baseURL = import.meta.env.VITE_SERVER_URL;

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ExternalServices {
  // Elimina el constructor, ya que no necesitamos la categoría como propiedad
  async getData(category) {
    try {
      // Realiza una solicitud al endpoint de la API para obtener los datos de productos
      const response = await fetch(`${baseURL}products/search/${category}`);
      const data = await convertToJson(response);
      return data.Result; // Devuelve la lista de productos del resultado
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }

  async findProductById(id) {
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(response);
    return data.Result;
  }
  
    }

