Documentation de la collection Postman – OWASP Juice Shop
1. Authentification utilisateur
Objectif
Cette requête permet d'authentifier un utilisateur et de récupérer un jeton JWT utilisé pour les requêtes protégées.
Élément
Valeur
Méthode
GET ou POST (selon la requête que tu as réellement utilisée)
URL
{{baseUrl}}/rest/user/login

Résultat JSON
{
    "authentication": {
        "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJkYXRhIjp7ImlkIjoyNCwidXNlcm5hbWUiOiIiLCJlbWFpbCI6InRlc3QxQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiNDZmOTRjOGRlMTRmYjM2NjgwODUwNzY4ZmYxYjdmMmEiLCJyb2xlIjoiY3VzdG9tZXIiLCJkZWx1eGVUb2tlbiI6IiIsImxhc3RMb2dpbklwIjoiMC4wLjAuMCIsInByb2ZpbGVJbWFnZSI6Ii9hc3NldHMvcHVibGljL2ltYWdlcy91cGxvYWRzL2RlZmF1bHQuc3ZnIiwidG90cFNlY3JldCI6IiIsImlzQWN0aXZlIjp0cnVlLCJjcmVhdGVkQXQiOiIyMDI2LTA4LTA1IDE0OjQwOjIzLjY4NiArMDA6MDAiLCJ1cGRhdGVkQXQiOiIyMDI2LTA4LTA1IDE0OjQwOjIzLjY4NiArMDA6MDAiLCJkZWxldGVkQXQiOm51bGx9LCJiaWQiOjYsImlhdCI6MTc4NTk0MDg5Nn0.Km1G7FFl1226vu1sBxrhUol6JBUBK_WYhydYEhR7GKjZ3cpBYtqwAeSlX5WqneN_WbsO_1q4u5AixxvfCEqNfkPHEBRNiquQ4ZM9q2v94pnawcA9T9qkeY9hi0lpwvHZOlqFOEGSX8IdfMMDhDCBEX9ZsKNd4GV1fgUSa5YoJ_k",
        "bid": 6,
        "umail": "test1@gmail.com"
    }
}
Résultat attendu
Code HTTP : 200 OK
Authentification réussie
Jeton JWT retourné
Conclusion
La requête s'est exécutée correctement et le serveur a renvoyé un jeton JWT valide.

2. Récupérer tous les produits
Objectif
Cette requête récupère la liste complète des produits disponibles.
Élément
Valeur
Méthode
GET
URL
{{baseUrl}}/api/Products

Résultat JSON
{
    "status": "success",
    "data": [
        {
            "id": 1,
            "name": "Apple Juice (1000ml)",
            "description": "The all-time classic.",
            "price": 1.99,
            "deluxePrice": 0.99,
            "image": "apple_juice.jpg",
            "createdAt": "2026-08-05T14:24:14.871Z",
            "updatedAt": "2026-08-05T14:24:14.871Z",
            "deletedAt": null
        },
        {
            "id": 2,
            "name": "Orange Juice (1000ml)",
            "description": "Made from oranges hand-picked by Uncle Dittmeyer.",
            "price": 2.99,
            "deluxePrice": 2.49,
            "image": "orange_juice.jpg",
            "createdAt": "2026-08-05T14:24:14.871Z",
            "updatedAt": "2026-08-05T14:24:14.871Z",
            "deletedAt": null
        },
        {
            "id": 3,
            "name": "Eggfruit Juice (500ml)",
            "description": "Now with even more exotic flavour.",
            "price": 8.99,
            "deluxePrice": 8.99,
            "image": "eggfruit_juice.jpg",
            "createdAt": "2026-08-05T14:24:14.871Z",
            "updatedAt": "2026-08-05T14:24:14.871Z",
            "deletedAt": null
        },
        {
            "id": 4,
            "name": "Raspberry Juice (1000ml)",
            "description": "Made from blended Raspberry Pi, water and sugar.",
            "price": 4.99,
            "deluxePrice": 4.99,
            "image": "raspberry_juice.jpg",
            "createdAt": "2026-08-05T14:24:14.871Z",
            "updatedAt": "2026-08-05T14:24:14.871Z",
            "deletedAt": null
        },
        {
            "id": 5,
            "name": "Lemon Juice (500ml)",
            "description": "Sour but full of vitamins.",
            "price": 2.99,
            "deluxePrice": 1.99,
            "image": "lemon_juice.jpg",
            "createdAt": "2026-08-05T14:24:14.871Z",
            "updatedAt": "2026-08-05T14:24:14.871Z",
            "deletedAt": null
        },
        {
            "id": 6,
            "name": "Banana Juice (1000ml)",
            "description": "Monkeys love it the most.",
            "price": 1.99,
            "deluxePrice": 1.99,
            "image": "banana_juice.jpg",
            "createdAt": "2026-08-05T14:24:14.871Z",
            "updatedAt": "2026-08-05T14:24:14.871Z",
            "deletedAt": null
        },
        {
            "id": 7,
            "name": "OWASP Juice Shop T-Shirt",
            "description": "Real fans wear it 24/7!",
            "price": 22.49,
            "deluxePrice": 22.49,
            "image": "fan_shirt.jpg",
            "createdAt": "2026-08-05T14:24:14.871Z",
            "updatedAt": "2026-08-05T14:24:14.871Z",
            "deletedAt": null
        },
        {
            "id": 8,
            "name": "OWASP Juice Shop CTF Girlie-Shirt",
            "description": "For serious Capture-the-Flag heroines only!",
            "price": 22.49,
            "deluxePrice": 22.49,
            "image": "fan_girlie.jpg",
            "createdAt": "2026-08-05T14:24:14.871Z",
            "updatedAt": "2026-08-05T14:24:14.871Z",
            "deletedAt": null
        },
        {
            "id": 9,
            "name": "OWASP SSL Advanced Forensic Tool (O-Saft)",
            "description": "O-Saft is an easy to use tool to show information about SSL certificate and tests the SSL connection according given list of ciphers and various SSL configurations. <a href=\"https://www.owasp.org/index.php/O-Saft\" target=\"_blank\">More...</a>",
            "price": 0.01,
            "deluxePrice": 0.01,
            "image": "orange_juice.jpg",
            "createdAt": "2026-08-05T14:24:14.871Z",
            "updatedAt": "2026-08-05T14:24:14.871Z",
            "deletedAt": null
        },
        {
            "id": 13,
            "name": "OWASP Juice Shop Iron-Ons (16pcs)",
            "description": "Upgrade your clothes with washer safe <a href=\"https://www.stickeryou.com/products/owasp-juice-shop/794\" target=\"_blank\">iron-ons</a> of the OWASP Juice Shop or CTF Extension logo!",
            "price": 14.99,
            "deluxePrice": 14.99,
            "image": "iron-on.jpg",
            "createdAt": "2026-08-05T14:24:14.871Z",
            "updatedAt": "2026-08-05T14:24:14.871Z",
            "deletedAt": null
        },
        {
            "id": 14,
            "name": "OWASP Juice Shop Magnets (16pcs)",
            "description": "Your fridge will be even cooler with these OWASP Juice Shop or CTF Extension logo <a href=\"https://www.stickeryou.com/products/owasp-juice-shop/794\" target=\"_blank\">magnets</a>!",
            "price": 15.99,
            "deluxePrice": 15.99,
            "image": "magnets.jpg",
            "createdAt": "2026-08-05T14:24:14.871Z",
            "updatedAt": "2026-08-05T14:24:14.871Z",
            "deletedAt": null
        },
        {
            "id": 15,
            "name": "OWASP Juice Shop Sticker Page",
            "description": "Massive decoration opportunities with these OWASP Juice Shop or CTF Extension <a href=\"https://www.stickeryou.com/products/owasp-juice-shop/794\" target=\"_blank\">sticker pages</a>! Each page has 16 stickers on it.",
            "price": 9.99,
            "deluxePrice": 9.99,
            "image": "sticker_page.jpg",
            "createdAt": "2026-08-05T14:24:14.871Z",
            "updatedAt": "2026-08-05T14:24:14.871Z",
            "deletedAt": null
        },
        {
            "id": 16,
            "name": "OWASP Juice Shop Sticker Single",
            "description": "Super high-quality vinyl <a href=\"https://www.stickeryou.com/products/owasp-juice-shop/794\" target=\"_blank\">sticker single</a> with the OWASP Juice Shop or CTF Extension logo! The ultimate laptop decal!",
            "price": 4.99,
            "deluxePrice": 4.99,
            "image": "sticker_single.jpg",
            "createdAt": "2026-08-05T14:24:14.871Z",
            "updatedAt": "2026-08-05T14:24:14.871Z",
            "deletedAt": null
        },
        {
            "id": 17,
            "name": "OWASP Juice Shop Temporary Tattoos (16pcs)",
            "description": "Get one of these <a href=\"https://www.stickeryou.com/products/owasp-juice-shop/794\" target=\"_blank\">temporary tattoos</a> to proudly wear the OWASP Juice Shop or CTF Extension logo on your skin! If you tweet a photo of yourself with the tattoo, you get a couple of our stickers for free! Please mention <a href=\"https://twitter.com/owasp_juiceshop\" target=\"_blank\"><code>@owasp_juiceshop</code></a> in your tweet!",
            "price": 14.99,
            "deluxePrice": 14.99,
            "image": "tattoo.jpg",
            "createdAt": "2026-08-05T14:24:14.871Z",
            "updatedAt": "2026-08-05T14:24:14.871Z",
            "deletedAt": null
        },
        {
            "id": 18,
            "name": "OWASP Juice Shop Mug",
            "description": "Black mug with regular logo on one side and CTF logo on the other! Your colleagues will envy you!",
            "price": 21.99,
            "deluxePrice": 21.99,
            "image": "fan_mug.jpg",
            "createdAt": "2026-08-05T14:24:14.871Z",
            "updatedAt": "2026-08-05T14:24:14.871Z",
            "deletedAt": null
        },
        {
            "id": 19,
            "name": "OWASP Juice Shop Hoodie",
            "description": "Mr. Robot-style apparel. But in black. And with logo.",
            "price": 49.99,
            "deluxePrice": 49.99,
            "image": "fan_hoodie.jpg",
            "createdAt": "2026-08-05T14:24:14.871Z",
            "updatedAt": "2026-08-05T14:24:14.871Z",
            "deletedAt": null
        },
        {
            "id": 20,
            "name": "OWASP Juice Shop-CTF Velcro Patch",
            "description": "4x3.5\" embroidered patch with velcro backside. The ultimate decal for every tactical bag or backpack!",
            "price": 2.92,
            "deluxePrice": 2.92,
            "image": "velcro-patch.jpg",
            "createdAt": "2026-08-05T14:24:14.871Z",
            "updatedAt": "2026-08-05T14:24:14.871Z",
            "deletedAt": null
        },
        {
            "id": 21,
            "name": "Woodruff Syrup \"Forest Master X-Treme\"",
            "description": "Harvested and manufactured in the Black Forest, Germany. Can cause hyperactive behavior in children. Can cause permanent green tongue when consumed undiluted.",
            "price": 6.99,
            "deluxePrice": 6.99,
            "image": "woodruff_syrup.jpg",
            "createdAt": "2026-08-05T14:24:14.871Z",
            "updatedAt": "2026-08-05T14:24:14.871Z",
            "deletedAt": null
        },
        {
            "id": 22,
            "name": "Green Smoothie",
            "description": "Looks poisonous but is actually very good for your health! Made from green cabbage, spinach, kiwi and grass.",
            "price": 1.99,
            "deluxePrice": 1.99,
            "image": "green_smoothie.jpg",
            "createdAt": "2026-08-05T14:24:14.871Z",
            "updatedAt": "2026-08-05T14:24:14.871Z",
            "deletedAt": null
        },
        {
            "id": 23,
            "name": "Quince Juice (1000ml)",
            "description": "Juice of the <em>Cydonia oblonga</em> fruit. Not exactly sweet but rich in Vitamin C.",
            "price": 4.99,
            "deluxePrice": 4.99,
            "image": "quince.jpg",
            "createdAt": "2026-08-05T14:24:14.871Z",
            "updatedAt": "2026-08-05T14:24:14.871Z",
            "deletedAt": null
        },
        {
            "id": 24,
            "name": "Apple Pomace",
            "description": "Finest pressings of apples. Allergy disclaimer: Might contain traces of worms. Can be <a href=\"/#recycle\">sent back to us</a> for recycling.",
            "price": 0.89,
            "deluxePrice": 0.89,
            "image": "apple_pressings.jpg",
            "createdAt": "2026-08-05T14:24:14.871Z",
            "updatedAt": "2026-08-05T14:24:14.871Z",
            "deletedAt": null
        },
        {
            "id": 25,
            "name": "Fruit Press",
            "description": "Fruits go in. Juice comes out. Pomace you can send back to us for recycling purposes.",
            "price": 89.99,
            "deluxePrice": 89.99,
            "image": "fruit_press.jpg",
            "createdAt": "2026-08-05T14:24:14.871Z",
            "updatedAt": "2026-08-05T14:24:14.871Z",
            "deletedAt": null
        },
        {
            "id": 26,
            "name": "OWASP Juice Shop Logo (3D-printed)",
            "description": "This rare item was designed and handcrafted in Sweden. This is why it is so incredibly expensive despite its complete lack of purpose.",
            "price": 99.99,
            "deluxePrice": 99.99,
            "image": "3d_keychain.jpg",
            "createdAt": "2026-08-05T14:24:14.871Z",
            "updatedAt": "2026-08-05T14:24:14.871Z",
            "deletedAt": null
        },
        {
            "id": 29,
            "name": "Strawberry Juice (500ml)",
            "description": "Sweet & tasty!",
            "price": 3.99,
            "deluxePrice": 3.99,
            "image": "strawberry_juice.jpeg",
            "createdAt": "2026-08-05T14:24:14.872Z",
            "updatedAt": "2026-08-05T14:24:14.872Z",
            "deletedAt": null
        },
        {
            "id": 30,
            "name": "Carrot Juice (1000ml)",
            "description": "As the old German saying goes: \"Carrots are good for the eyes. Or has anyone ever seen a rabbit with glasses?\"",
            "price": 2.99,
            "deluxePrice": 2.99,
            "image": "carrot_juice.jpeg",
            "createdAt": "2026-08-05T14:24:14.872Z",
            "updatedAt": "2026-08-05T14:24:14.872Z",
            "deletedAt": null
        },
        {
            "id": 32,
            "name": "Pwning OWASP Juice Shop",
            "description": "<em>The official Companion Guide</em> by Björn Kimminich available <a href=\"https://leanpub.com/juice-shop\">for free on LeanPub</a> and also <a href=\"https://pwning.owasp-juice.shop\">readable online</a>!",
            "price": 5.99,
            "deluxePrice": 5.99,
            "image": "cover_small.jpg",
            "createdAt": "2026-08-05T14:24:14.872Z",
            "updatedAt": "2026-08-05T14:24:14.872Z",
            "deletedAt": null
        },
        {
            "id": 33,
            "name": "Melon Bike (Comeback-Product 2018 Edition)",
            "description": "The wheels of this bicycle are made from real water melons. You might not want to ride it up/down the curb too hard.",
            "price": 2999,
            "deluxePrice": 2999,
            "image": "melon_bike.jpeg",
            "createdAt": "2026-08-05T14:24:14.872Z",
            "updatedAt": "2026-08-05T14:24:14.872Z",
            "deletedAt": null
        },
        {
            "id": 34,
            "name": "OWASP Juice Shop Coaster (10pcs)",
            "description": "Our 95mm circle coasters are printed in full color and made from thick, premium coaster board.",
            "price": 19.99,
            "deluxePrice": 19.99,
            "image": "coaster.jpg",
            "createdAt": "2026-08-05T14:24:14.872Z",
            "updatedAt": "2026-08-05T14:24:14.872Z",
            "deletedAt": null
        },
        {
            "id": 35,
            "name": "OWASP Snakes and Ladders - Web Applications",
            "description": "This amazing web application security awareness board game is <a href=\"https://steamcommunity.com/sharedfiles/filedetails/?id=1969196030\">available for Tabletop Simulator on Steam Workshop</a> now!",
            "price": 0.01,
            "deluxePrice": 0.01,
            "image": "snakes_ladders.jpg",
            "createdAt": "2026-08-05T14:24:14.872Z",
            "updatedAt": "2026-08-05T14:24:14.872Z",
            "deletedAt": null
        },
        {
            "id": 36,
            "name": "OWASP Snakes and Ladders - Mobile Apps",
            "description": "This amazing mobile app security awareness board game is <a href=\"https://steamcommunity.com/sharedfiles/filedetails/?id=1970691216\">available for Tabletop Simulator on Steam Workshop</a> now!",
            "price": 0.01,
            "deluxePrice": 0.01,
            "image": "snakes_ladders_m.jpg",
            "createdAt": "2026-08-05T14:24:14.872Z",
            "updatedAt": "2026-08-05T14:24:14.872Z",
            "deletedAt": null
        },
        {
            "id": 37,
            "name": "OWASP Juice Shop Holographic Sticker",
            "description": "Die-cut holographic sticker. Stand out from those 08/15-sticker-covered laptops with this shiny beacon of 80's coolness!",
            "price": 2,
            "deluxePrice": 2,
            "image": "holo_sticker.png",
            "createdAt": "2026-08-05T14:24:14.872Z",
            "updatedAt": "2026-08-05T14:24:14.872Z",
            "deletedAt": null
        },
        {
            "id": 38,
            "name": "OWASP Juice Shop \"King of the Hill\" Facemask",
            "description": "Facemask with compartment for filter from 50% cotton and 50% polyester.",
            "price": 13.49,
            "deluxePrice": 13.49,
            "image": "fan_facemask.jpg",
            "createdAt": "2026-08-05T14:24:14.872Z",
            "updatedAt": "2026-08-05T14:24:14.872Z",
            "deletedAt": null
        },
        {
            "id": 41,
            "name": "Juice Shop \"Permafrost\" 2020 Edition",
            "description": "Exact version of <a href=\"https://github.com/juice-shop/juice-shop/releases/tag/v9.3.1-PERMAFROST\">OWASP Juice Shop that was archived on 02/02/2020</a> by the GitHub Archive Program and ultimately went into the <a href=\"https://github.blog/2020-07-16-github-archive-program-the-journey-of-the-worlds-open-source-code-to-the-arctic\">Arctic Code Vault</a> on July 8. 2020 where it will be safely stored for at least 1000 years.",
            "price": 9999.99,
            "deluxePrice": 9999.99,
            "image": "permafrost.jpg",
            "createdAt": "2026-08-05T14:24:14.872Z",
            "updatedAt": "2026-08-05T14:24:14.872Z",
            "deletedAt": null
        },
        {
            "id": 42,
            "name": "Best Juice Shop Salesman Artwork",
            "description": "Unique digital painting depicting Stan, our most qualified and almost profitable salesman. He made a succesful carreer in selling used ships, coffins, krypts, crosses, real estate, life insurance, restaurant supplies, voodoo enhanced asbestos and courtroom souvenirs before <em>finally</em> adding his expertise to the Juice Shop marketing team.",
            "price": 5000,
            "deluxePrice": 5000,
            "image": "artwork2.jpg",
            "createdAt": "2026-08-05T14:24:14.872Z",
            "updatedAt": "2026-08-05T14:24:14.872Z",
            "deletedAt": null
        },
        {
            "id": 43,
            "name": "OWASP Juice Shop Card (non-foil)",
            "description": "Mythic rare <small><em>(obviously...)</em></small> card \"OWASP Juice Shop\" with three distinctly useful abilities. Alpha printing, mint condition. A true collectors piece to own!",
            "price": 1000,
            "deluxePrice": 1000,
            "image": "card_alpha.jpg",
            "createdAt": "2026-08-05T14:24:14.872Z",
            "updatedAt": "2026-08-05T14:24:14.872Z",
            "deletedAt": null
        },
        {
            "id": 45,
            "name": "OWASP Juice Shop LEGO™ Tower",
            "description": "Want to host a Juice Shop CTF in style? Build <a href=\"https://github.com/OWASP/owasp-swag/blob/master/projects/juice-shop/lego/OWASP%20JuiceShop%20Pi-server%201.2.pdf\" target=\"_blank\">your own LEGO™ tower</a> which holds four Raspberry Pi 4 models with PoE HAT modules <a href=\"https://github.com/juice-shop/multi-juicer/blob/main/guides/raspberry-pi/raspberry-pi.md\" target=\"_blank\">running a MultiJuicer Kubernetes cluster</a>! Wire to a switch and connect to your network to have an out-of-the-box ready CTF up in no time!",
            "price": 799,
            "deluxePrice": 799,
            "image": "lego_case.jpg",
            "createdAt": "2026-08-05T14:24:14.872Z",
            "updatedAt": "2026-08-05T14:24:14.872Z",
            "deletedAt": null
        },
        {
            "id": 47,
            "name": "Pineapple Juice (1000ml)",
            "description": "Tropical refreshment from the finest sun-ripened pineapples.",
            "price": 2.99,
            "deluxePrice": 2.99,
            "image": "pineapple_juice.png",
            "createdAt": "2026-08-05T14:24:14.872Z",
            "updatedAt": "2026-08-05T14:24:14.872Z",
            "deletedAt": null
        },
        {
            "id": 48,
            "name": "Melon Juice (1000ml)",
            "description": "Refreshing and sweet juice made from ripe melons.",
            "price": 2.49,
            "deluxePrice": 2.49,
            "image": "melon_juice.png",
            "createdAt": "2026-08-05T14:24:14.872Z",
            "updatedAt": "2026-08-05T14:24:14.872Z",
            "deletedAt": null
        },
        {
            "id": 49,
            "name": "Grape Juice (1000ml)",
            "description": "Deep purple and full of antioxidants from selected grapes.",
            "price": 2.99,
            "deluxePrice": 2.99,
            "image": "grape_juice.png",
            "createdAt": "2026-08-05T14:24:14.872Z",
            "updatedAt": "2026-08-05T14:24:14.872Z",
            "deletedAt": null
        },
        {
            "id": 50,
            "name": "Dragonfruit Juice (500ml)",
            "description": "Exotic and vibrant juice made from dragonfruit.",
            "price": 3.99,
            "deluxePrice": 3.99,
            "image": "dragonfruit_juice.png",
            "createdAt": "2026-08-05T14:24:14.872Z",
            "updatedAt": "2026-08-05T14:24:14.872Z",
            "deletedAt": null
        },
        {
            "id": 51,
            "name": "Berry Juice (1000ml)",
            "description": "A delicious blend of fresh forest berries.",
            "price": 3.49,
            "deluxePrice": 3.49,
            "image": "berry_juice.png",
            "createdAt": "2026-08-05T14:24:14.872Z",
            "updatedAt": "2026-08-05T14:24:14.872Z",
            "deletedAt": null
        },
        {
            "id": 52,
            "name": "Basil Smoothie",
            "description": "A unique blend of fresh basil and ginger for a healthy kick.",
            "price": 2.99,
            "deluxePrice": 2.99,
            "image": "basil_smoothie.png",
            "createdAt": "2026-08-05T14:24:14.872Z",
            "updatedAt": "2026-08-05T14:24:14.872Z",
            "deletedAt": null
        },
        {
            "id": 53,
            "name": "Bragă (500ml)",
            "description": "Traditional Balkan drink made from fermented millet. Lightly sweet-sour, refreshing, and naturally energizing.",
            "price": 2.49,
            "deluxePrice": 2.49,
            "image": "braga.jpg",
            "createdAt": "2026-08-05T14:24:14.872Z",
            "updatedAt": "2026-08-05T14:24:14.872Z",
            "deletedAt": null
        },
        {
            "id": 54,
            "name": "Elderflower Cordial (500ml)",
            "description": "Floral and fragrant soft drink made from elderflowers. Traditionally enjoyed chilled.",
            "price": 3.29,
            "deluxePrice": 3.29,
            "image": "elderflower_cordial.jpg",
            "createdAt": "2026-08-05T14:24:14.872Z",
            "updatedAt": "2026-08-05T14:24:14.872Z",
            "deletedAt": null
        },
        {
            "id": 55,
            "name": "Sea Buckthorn Juice (500ml)",
            "description": "Tangy and slightly sour juice, extremely rich in Vitamin C and antioxidants.",
            "price": 3.99,
            "deluxePrice": 3.99,
            "image": "sea_buckthorn_juice.jpg",
            "createdAt": "2026-08-05T14:24:14.872Z",
            "updatedAt": "2026-08-05T14:24:14.872Z",
            "deletedAt": null
        },
        {
            "id": 56,
            "name": "Pomegranate Drink (500ml)",
            "description": "A sweet and tart refreshment inspired by classic grenadine flavors.",
            "price": 4.49,
            "deluxePrice": 4.49,
            "image": "pomegranate_drink.jpg",
            "createdAt": "2026-08-05T14:24:14.872Z",
            "updatedAt": "2026-08-05T14:24:14.872Z",
            "deletedAt": null
        }
    ]
}

Résultat attendu
HTTP 200 OK
Liste des produits affichée
Conclusion
Le serveur renvoie correctement les produits disponibles.

3. Rechercher un produit
Objectif
Tester la fonctionnalité de recherche.
URL
GET {{baseUrl}}/rest/products/search?q=apple
Résultat JSON
{
    "status": "success",
    "data": [
        {
            "id": 1,
            "name": "Apple Juice (1000ml)",
            "description": "The all-time classic.",
            "price": 1.99,
            "deluxePrice": 0.99,
            "image": "apple_juice.jpg",
            "createdAt": "2026-08-05 14:24:14.871 +00:00",
            "updatedAt": "2026-08-05 14:24:14.871 +00:00",
            "deletedAt": null
        },
        {
            "id": 24,
            "name": "Apple Pomace",
            "description": "Finest pressings of apples. Allergy disclaimer: Might contain traces of worms. Can be <a href=\"/#recycle\">sent back to us</a> for recycling.",
            "price": 0.89,
            "deluxePrice": 0.89,
            "image": "apple_pressings.jpg",
            "createdAt": "2026-08-05 14:24:14.871 +00:00",
            "updatedAt": "2026-08-05 14:24:14.871 +00:00",
            "deletedAt": null
        },
        {
            "id": 47,
            "name": "Pineapple Juice (1000ml)",
            "description": "Tropical refreshment from the finest sun-ripened pineapples.",
            "price": 2.99,
            "deluxePrice": 2.99,
            "image": "pineapple_juice.png",
            "createdAt": "2026-08-05 14:24:14.872 +00:00",
            "updatedAt": "2026-08-05 14:24:14.872 +00:00",
            "deletedAt": null
        }
    ]
}

Conclusion
La recherche fonctionne correctement.

4. Questions de sécurité
Objectif
Afficher les questions de sécurité disponibles.
Résultat JSON
{
    "status": "success",
    "data": [
        {
            "id": 1,
            "question": "Your eldest siblings middle name?",
            "createdAt": "2026-08-05T14:24:14.195Z",
            "updatedAt": "2026-08-05T14:24:14.195Z"
        },
        {
            "id": 2,
            "question": "Mother's maiden name?",
            "createdAt": "2026-08-05T14:24:14.195Z",
            "updatedAt": "2026-08-05T14:24:14.195Z"
        },
        {
            "id": 3,
            "question": "Mother's birth date? (MM/DD/YY)",
            "createdAt": "2026-08-05T14:24:14.195Z",
            "updatedAt": "2026-08-05T14:24:14.195Z"
        },
        {
            "id": 4,
            "question": "Father's birth date? (MM/DD/YY)",
            "createdAt": "2026-08-05T14:24:14.195Z",
            "updatedAt": "2026-08-05T14:24:14.195Z"
        },
        {
            "id": 5,
            "question": "Maternal grandmother's first name?",
            "createdAt": "2026-08-05T14:24:14.195Z",
            "updatedAt": "2026-08-05T14:24:14.195Z"
        },
        {
            "id": 6,
            "question": "Paternal grandmother's first name?",
            "createdAt": "2026-08-05T14:24:14.195Z",
            "updatedAt": "2026-08-05T14:24:14.195Z"
        },
        {
            "id": 7,
            "question": "Name of your favorite pet?",
            "createdAt": "2026-08-05T14:24:14.196Z",
            "updatedAt": "2026-08-05T14:24:14.196Z"
        },
        {
            "id": 8,
            "question": "Last name of dentist when you were a teenager? (Do not include 'Dr.')",
            "createdAt": "2026-08-05T14:24:14.196Z",
            "updatedAt": "2026-08-05T14:24:14.196Z"
        },
        {
            "id": 9,
            "question": "Your ZIP/postal code when you were a teenager?",
            "createdAt": "2026-08-05T14:24:14.196Z",
            "updatedAt": "2026-08-05T14:24:14.196Z"
        },
        {
            "id": 10,
            "question": "Company you first work for as an adult?",
            "createdAt": "2026-08-05T14:24:14.196Z",
            "updatedAt": "2026-08-05T14:24:14.196Z"
        },
        {
            "id": 11,
            "question": "Your favorite book?",
            "createdAt": "2026-08-05T14:24:14.196Z",
            "updatedAt": "2026-08-05T14:24:14.196Z"
        },
        {
            "id": 12,
            "question": "Your favorite movie?",
            "createdAt": "2026-08-05T14:24:14.196Z",
            "updatedAt": "2026-08-05T14:24:14.196Z"
        },
        {
            "id": 13,
            "question": "Number of one of your customer or ID cards?",
            "createdAt": "2026-08-05T14:24:14.196Z",
            "updatedAt": "2026-08-05T14:24:14.196Z"
        },
        {
            "id": 14,
            "question": "What's your favorite place to go hiking?",
            "createdAt": "2026-08-05T14:24:14.196Z",
            "updatedAt": "2026-08-05T14:24:14.196Z"
        }
    ]
}

Conclusion
Les questions de sécurité sont correctement récupérées.

5. Feedbacks
Objectif
Consulter les avis des utilisateurs.
Résultat JSON
{
    "status": "success",
    "data": [
        {
            "UserId": 1,
            "id": 1,
            "comment": "I love this shop! Best products in town! Highly recommended! (***in@juice-sh.op)",
            "rating": 5,
            "createdAt": "2026-08-05T14:24:14.335Z",
            "updatedAt": "2026-08-05T14:24:14.335Z"
        },
        {
            "UserId": 2,
            "id": 2,
            "comment": "Great shop! Awesome service! (***@juice-sh.op)",
            "rating": 4,
            "createdAt": "2026-08-05T14:24:14.338Z",
            "updatedAt": "2026-08-05T14:24:14.338Z"
        },
        {
            "UserId": 3,
            "id": 3,
            "comment": "Nothing useful available here! (***der@juice-sh.op)",
            "rating": 1,
            "createdAt": "2026-08-05T14:24:14.341Z",
            "updatedAt": "2026-08-05T14:24:14.341Z"
        },
        {
            "UserId": 21,
            "id": 4,
            "comment": "Please send me the juicy chatbot NFT in my wallet at /juicy-nft : \"purpose betray marriage blame crunch monitor spin slide donate sport lift clutch\" (***ereum@juice-sh.op)",
            "rating": 1,
            "createdAt": "2026-08-05T14:24:14.391Z",
            "updatedAt": "2026-08-05T14:24:14.391Z"
        },
        {
            "UserId": null,
            "id": 5,
            "comment": "Incompetent customer support! Can't even upload photo of broken purchase!<br /><em>Support Team: Sorry, only order confirmation PDFs can be attached to complaints!</em> (anonymous)",
            "rating": 2,
            "createdAt": "2026-08-05T14:24:15.111Z",
            "updatedAt": "2026-08-05T14:24:15.111Z"
        },
        {
            "UserId": null,
            "id": 6,
            "comment": "This is <b>the</b> store for awesome stuff of all kinds! (anonymous)",
            "rating": 4,
            "createdAt": "2026-08-05T14:24:15.111Z",
            "updatedAt": "2026-08-05T14:24:15.111Z"
        },
        {
            "UserId": null,
            "id": 7,
            "comment": "Never gonna buy anywhere else from now on! Thanks for the great service! (anonymous)",
            "rating": 4,
            "createdAt": "2026-08-05T14:24:15.111Z",
            "updatedAt": "2026-08-05T14:24:15.111Z"
        },
        {
            "UserId": null,
            "id": 8,
            "comment": "Keep up the good work! (anonymous)",
            "rating": 3,
            "createdAt": "2026-08-05T14:24:15.111Z",
            "updatedAt": "2026-08-05T14:24:15.111Z"
        }
    ]
}

Conclusion
Les commentaires sont affichés correctement.

Conclusion générale
La collection Postman développée pour OWASP Juice Shop permet de valider les principaux services REST de l'application. Les différentes requêtes ont été exécutées avec succès et les réponses obtenues respectent les résultats attendus (codes HTTP, format JSON et contenu des données). Cette collection constitue une base de tests API réutilisable pour les futures campagnes de validation.

