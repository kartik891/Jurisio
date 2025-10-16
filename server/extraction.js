let string = "Some arandon texta -- 1 of 10 --   Aganin Some random -- 2 of 10 --";
const totalPages = 10;
const regex = new RegExp(`-- \\d+ of \\d+ --`,'g');

const pages = string.split(regex).map(pages => pages.trim()).filter(pages => pages.length > 0) ;

console.log(pages);