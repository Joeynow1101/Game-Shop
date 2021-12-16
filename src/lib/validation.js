const productNameMinLength = (name, stringLength) => name.length > stringLength;
const priceGreaterThanZero = (price) => price > 0;
const validCategory = (platform) => platform !== "";
const validEmail = (email) => email.includes("@");
const isValidDomain = (email) => email.split('@')[1].includes('.');

const productValid = (product) =>
  productNameMinLength(product.name, 3) &&
  priceGreaterThanZero(product.price) &&
  validCategory(product.platform) &&
  validEmail(product.contactEmail);

  export default productValid;