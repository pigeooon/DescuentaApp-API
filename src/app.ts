import { Scraper } from "./models/scraper";
import { DiscountsRepository } from "./types/discounts_repository.type";

const discountRepository: DiscountsRepository = {
    url: "https://www.scotiaclub.cl/scclubfront/categoria/mundos/descuentos",
    discount_name_path: "#row-descuentos > .descuento > .card > .card-body > .scotia-headline",
    discount_img_path: "#row-descuentos > .descuento > .card > img",
    discount_description_path: "#row-descuentos > .descuento > .card > .card-body > .mb-1",
    discount_details_url_path: "#row-descuentos > .descuento > .card > .card-body > .mb-1"
};

const scraper = new Scraper(discountRepository);

scraper.scrap().then((data) => {
    console.log(data);
});