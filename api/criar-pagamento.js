import mercadopago from "mercadopago";

mercadopago.configure({
  access_token: "APP_USR-5777321285546942-031716-f1f462164bc8fd8022c2f6dd76f3c084-433616002"
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const { items } = req.body;

    const preference = {
      items: items.map(item => ({
        title: item.nome,
        quantity: item.qtd,
        unit_price: Number(item.preco)
      })),

      payment_methods: {
        installments: 12
      },

      back_urls: {
        success: "https://seusite.com/sucesso",
        failure: "https://seusite.com/erro",
        pending: "https://seusite.com/pendente"
      },

      auto_return: "approved"
    };

    const response = await mercadopago.preferences.create(preference);

    return res.status(200).json({
      link: response.body.init_point
    });

  } catch (error) {
    return res.status(500).json({
      error: "Erro ao criar pagamento",
      detalhe: error.message
    });
  }
}
