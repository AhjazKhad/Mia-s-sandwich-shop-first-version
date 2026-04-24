const DAY_IN_MS = 24 * 60 * 60 * 1000;

function createExpiryDate(daysFromNow = 7) {
    return new Date(Date.now() + daysFromNow * DAY_IN_MS);
}

function formatExpiryDate(date) {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}`;
}

const DEFAULT_EXPIRY_DAYS_BY_CATEGORY = {
    sandwich: 3,
    sides: 14,
    coffee: 5,
    dessert: 7,
    cake: 7
};

class Product {
    constructor(id, name, price, img, category, description = "", expiryDate = null) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.img = img;
        this.category = category;
        this.description = description;
        this.expiryDate = expiryDate instanceof Date ? expiryDate : new Date(expiryDate);

        if (Number.isNaN(this.expiryDate.getTime())) {
            this.expiryDate = createExpiryDate();
        }
    }

    getDescription() {
        return `Expires on: ${formatExpiryDate(this.expiryDate)}`;
    }
}

class CustomSandwich extends Product {
    #fillings;

    constructor(id, name, price, img, category, description = "", expiryDate = null, fillings = []) {
        super(id, name, price, img, category, description, expiryDate);
        this.#fillings = Array.isArray(fillings) ? fillings : [];
    }

    getDescription() {
        const fillingsText = this.#fillings.length > 0 ? this.#fillings.join(", ") : "No fillings";
        return `Fillings: ${fillingsText}. Expires on: ${formatExpiryDate(this.expiryDate)}`;
    }
}

const PRODUCT_DATA = [
    // Sandwiches
    {
        id: 1,
        name: "Tomato & Greens Sandwich",
        price: 5.80,
        description: "A light sandwich with dried tomatoes, fresh greens, and smooth sour cream.",
        img: "images/Tomato & Greens.png",
        category: "sandwich",
        fillings: ["tomato"]
    },
    {
        id: 2,
        name: "Ham Classic Sandwich",
        price: 5.80,
        description: "A classic ham sandwich with fresh lettuce and tomatoes.",
        img: "images/ham classic.png",
        category: "sandwich"
    },
    {
        id: 3,
        name: "Ham and Greens Sandwich",
        price: 6.00,
        description: "A ham sandwich with fresh greens and a tangy sauce.",
        img: "images/ham and greens.png",
        category: "sandwich"
    },
    {
        id: 4,
        name: "Cheesy Ham & Greens Sandwich",
        price: 6.50,
        description: "A delicious ham sandwich with cheese and fresh greens.",
        img: "images/Cheesy Ham & Greens.png",
        category: "sandwich"
    },
    {
        id: 5,
        name: "Avocado & Ham Sandwich",
        price: 8.80,
        description: "A gourmet sandwich with creamy avocado and savory ham.",
        img: "images/Avocado & Ham.png",
        category: "sandwich"
    },
    {
        id: 6,
        name: "Egg and Cheese Sandwich",
        price: 5.80,
        description: "A hearty sandwich with scrambled eggs and melted cheese.",
        img: "images/egg and cheese.png",
        category: "sandwich"
    },
    {
        id: 7,
        name: "Egg Crown Sandwich",
        price: 4.50,
        description: "A simple sandwich with a fried egg and fresh vegetables.",
        img: "images/egg crown.png",
        category: "sandwich"
    },
    {
        id: 8,
        name: "Waffle Sandwich",
        price: 6.00,
        description: "A sweet and savoury sandwich with waffles, syrup, and fresh fruit.",
        img: "images/waffle.png",
        category: "sandwich"
    },
    {
        id: 9,
        name: "Kabab Filled Sandwich",
        price: 3.85,
        description: "A spicy sandwich filled with flavorful kabab and fresh veggies.",
        img: "images/kabab filled.png",
        category: "sandwich"
    },
    {
        id: 10,
        name: "Non-Veg Spicy Sandwich",
        price: 4.20,
        description: "A spicy non-vegetarian sandwich with a kick of flavour.",
        img: "images/non spicy.png",
        category: "sandwich"
    },

    // Sides / Fries
    {
        id: 11,
        name: "Fries (M) + Piri Piri Mix",
        price: 1.90,
        description: "Crispy fries served with a spicy piri piri mix for dipping.",
        img: "images/piri piri.png",
        category: "sides"
    },
    {
        id: 12,
        name: "Salsa Cheese Fries",
        price: 1.30,
        description: "Crispy fries topped with a tangy salsa and melted cheese.",
        img: "images/salsa.png",
        category: "sides"
    },
    {
        id: 13,
        name: "Fries (Large)",
        price: 1.40,
        description: "A large serving of crispy fries.",
        img: "images/large fries.png",
        category: "sides"
    },
    {
        id: 14,
        name: "Fries (Medium)",
        price: 1.20,
        description: "A medium serving of crispy fries.",
        img: "images/medium fries.png",
        category: "sides"
    },
    {
        id: 15,
        name: "Fries (Regular)",
        price: 1.00,
        description: "A regular serving of crispy fries.",
        img: "images/fries.png",
        category: "sides"
    },
    {
        id: 16,
        name: "Oreo McFlurry (M)",
        price: 1.20,
        description: "A delicious McFlurry dessert with Oreo cookies.",
        img: "images/oreo.png",
        category: "dessert"
    },
    {
        id: 17,
        name: "Classic Cheese Fries",
        price: 1.80,
        description: "The most cheesy fries.",
        img: "images/Classic Cheese Fries.png",
        category: "sides"
    },
    {
        id: 18,
        name: "Veg Pizza McPuff",
        price: 2.00,
        description: "The perfect mini pizza.",
        img: "images/Veg Pizza McPuff.png",
        category: "sides"
    },
    {
        id: 19,
        name: "Classic Corn Cup",
        price: 0.90,
        description: "A tasty cup of corn.",
        img: "images/Classic Corn Cup.png",
        category: "sides"
    },
    {
        id: 20,
        name: "Mustard Sauce",
        price: 0.30,
        description: "Simple mustard sauce.",
        img: "images/Mustard Sauce.png",
        category: "sides"
    },
    {
        id: 21,
        name: "Barbeque Sauce",
        price: 0.90,
        description: "The classic barbeque sauce.",
        img: "images/Barbeque Sauce.png",
        category: "sides"
    },
    {
        id: 22,
        name: "Chilli Sauce",
        price: 0.90,
        description: "A classic chilli sauce.",
        img: "images/Chilli Sauce.png",
        category: "sides"
    },
    {
        id: 23,
        name: "Piri Piri Spice Mix",
        price: 0.40,
        description: "A spicy mix for fries.",
        img: "images/Piri Piri Spice Mix.png",
        category: "sides"
    },

    // Coffee / Drinks
    {
        id: 24,
        name: "Iced Coffee with Cinnamon",
        price: 2.90,
        description: "Mia's classic coffee.",
        img: "images/Iced Coffee with Cinammon.png",
        category: "coffee"
    },
    {
        id: 25,
        name: "Classic Coffee Regular",
        price: 2.80,
        description: "A regular coffee.",
        img: "images/Classic Coffee Regular.png",
        category: "coffee"
    },
    {
        id: 26,
        name: "Mia's Earth Experiment",
        price: 2.80,
        description: "A dessert-style coffee.",
        img: "images/earth ice cream.png",
        category: "coffee"
    },
    {
        id: 27,
        name: "Earthy Drink",
        price: 2.15,
        description: "An aesthetic earthy vibe drink.",
        img: "images/Earthy drink.png",
        category: "coffee"
    },
    {
        id: 28,
        name: "Cotton Candy Matcha",
        price: 1.85,
        description: "Sweet and grassy matcha.",
        img: "images/Cotton candy matcha.png",
        category: "coffee"
    },
    {
        id: 29,
        name: "Cherry Blossom Ice Cream",
        price: 1.90,
        description: "Vanilla and strawberry ice cream shaped into flowers.",
        img: "images/cherry blossom ice cream.png",
        category: "dessert"
    },
    {
        id: 30,
        name: "Smug Face",
        price: 1.50,
        description: "Grape flavoured ice cream.",
        img: "images/smug face.png",
        category: "cake"
    },
    {
        id: 31,
        name: "Black Forest Ice Cream",
        price: 1.40,
        description: "Chocolate and cherry ice cream with chocolate flakes.",
        img: "images/Black Forest McFlurry(M).png",
        category: "dessert"
    }
];

const PRODUCTS = PRODUCT_DATA.map((p) => {
    const expiryDays = DEFAULT_EXPIRY_DAYS_BY_CATEGORY[p.category] || 7;
    const expiryDate = p.expiryDate ? new Date(p.expiryDate) : createExpiryDate(expiryDays);

    if (p.category === "sandwich") {
        return new CustomSandwich(
            p.id,
            p.name,
            p.price,
            p.img,
            p.category,
            p.description,
            expiryDate,
            p.fillings ?? []
        );
    }

    return new Product(
        p.id,
        p.name,
        p.price,
        p.img,
        p.category,
        p.description,
        expiryDate
    );
});
