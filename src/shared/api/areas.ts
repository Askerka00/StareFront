interface Area {
  id: string;
  name: string;
  is_visible: boolean;
  price_delivery_value: number;
  price_delivery_currency: string;
}

export const getOneById = async ({ id }: { id: string }): Promise<Area> => {
  const list = await getList();

  const item = list.filter((item) => item.id === id)[0] || null;

  if (!item) {
    throw new Error(`E_NOT_FOUND`);
  }

  return item;
};

export const getOneByName = async ({
  name,
}: {
  name: string;
}): Promise<Area> => {
  const list = await getList();

  const item = list.filter((item) => item.name === name)[0] || null;

  if (!item) {
    throw new Error(`E_NOT_FOUND`);
  }

  return item;
};

export const getList = async (): Promise<Area[]> => {
  return [
    {
      id: "0192430f-6147-7116-bcf6-d62b4a88f1f4",
      name: "Airport Phuket",
      is_visible: true,
      price_delivery_value: 90000,
      price_delivery_currency: "THB",
    },
    {
      id: "0192430f-6e1a-7449-9d4f-9a04df9770fa",
      name: "Naithon",
      is_visible: true,
      price_delivery_value: 80000,
      price_delivery_currency: "THB",
    },
    {
      id: "0192430f-8022-7aa2-bc25-da4b7bc8f40b",
      name: "Mai Khao",
      is_visible: true,
      price_delivery_value: 100000,
      price_delivery_currency: "THB",
    },
    {
      id: "0192430f-9442-7883-b86c-3acfd4d2c349",
      name: "Thalang",
      is_visible: true,
      price_delivery_value: 50000,
      price_delivery_currency: "THB",
    },
    {
      id: "0192430f-a577-7445-9272-a5db874d2aa1",
      name: "Bangtao",
      is_visible: true,
      price_delivery_value: 70000,
      price_delivery_currency: "THB",
    },
    {
      id: "0192430f-b63c-722b-bd69-1320fd22e243",
      name: "Laguna",
      is_visible: true,
      price_delivery_value: 70000,
      price_delivery_currency: "THB",
    },
    {
      id: "0192430f-c3d9-7ccb-97bd-c9b8a8d6a5fa",
      name: "Kamala",
      is_visible: true,
      price_delivery_value: 60000,
      price_delivery_currency: "THB",
    },
    {
      id: "0192430f-d066-7997-91da-4a6daea4f80f",
      name: "Surin",
      is_visible: true,
      price_delivery_value: 50000,
      price_delivery_currency: "THB",
    },
    {
      id: "0192430f-db76-7bbf-aee7-31d929e80076",
      name: "Patong",
      is_visible: true,
      price_delivery_value: 50000,
      price_delivery_currency: "THB",
    },
    {
      id: "0192430f-eb88-7cc8-8491-f1bc1efe21f2",
      name: "Karon",
      is_visible: true,
      price_delivery_value: 30000,
      price_delivery_currency: "THB",
    },
    {
      id: "0192430f-fc41-7779-92fa-962541c123ec",
      name: "Kata",
      is_visible: true,
      price_delivery_value: 20000,
      price_delivery_currency: "THB",
    },
    {
      id: "01924310-0c8b-7339-811f-56068979aa52",
      name: "Chalong",
      is_visible: true,
      price_delivery_value: 20000,
      price_delivery_currency: "THB",
    },
    {
      id: "01924310-1b7b-7225-b0c2-7baf379ba6df",
      name: "Katu",
      is_visible: true,
      price_delivery_value: 20000,
      price_delivery_currency: "THB",
    },
    {
      id: "01924310-287b-711a-a02f-403c4e7d2f1a",
      name: "Nai Harn",
      is_visible: true,
      price_delivery_value: 40000,
      price_delivery_currency: "THB",
    },
    {
      id: "01924310-34f7-7000-8b83-83d41a2a9116",
      name: "Rawai",
      is_visible: true,
      price_delivery_value: 40000,
      price_delivery_currency: "THB",
    },
    {
      id: "01924310-472c-766c-bc5e-6707f80572fa",
      name: "Phuket Town",
      is_visible: true,
      price_delivery_value: 40000,
      price_delivery_currency: "THB",
    },
    {
      id: "01924310-643c-7337-abb9-7403d963148a",
      name: "Panwa",
      is_visible: true,
      price_delivery_value: 50000,
      price_delivery_currency: "THB",
    },
  ].filter((item) => item.is_visible);
};
