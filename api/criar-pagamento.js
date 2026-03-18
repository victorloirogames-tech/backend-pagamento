import { MercadoPagoConfig, Preference } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: "APP_USR-5777321285546942-031716-f1f462164bc8fd8022c2f6dd76f3c084-433616002"
});

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    const { items } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({
        error: "Carrinho vazio"
      });
    }

    const preference = new Preference(client);

    const result = await preference.create({
      body: {
        items: items
      }
    });

    return res.status(200).json({
      init_point: result.init_point
    });

  } catch (error) {
    console.error("ERRO:", error);
    return res.status(500).json({
      error: "Erro ao criar pagamento"
    });
  }
}
