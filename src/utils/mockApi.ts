export async function mockApiResponse(input: string): Promise<string> {
    return new Promise((resolve) => {
      // Simular un retraso de 1 segundo para imitar la llamada a una API
      setTimeout(() => {
        // Generar una respuesta simulada
        resolve(`Esta es una respuesta mock para: "${input}"`);
      }, 1000);
    });
  }


  export async function mockMongoQuery(input: string): Promise<string> {
    return new Promise((resolve) => {
      // Simular un retraso de 1 segundo para imitar la llamada a una API
      setTimeout(() => {
        // Generar una respuesta simulada
        resolve(`Esta es una respuesta mock para: "${input}"`);
      }, 1500);
    });
  }
  