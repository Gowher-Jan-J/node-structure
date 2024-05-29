export class SchemaError {
  constructor(errors, data) {
    this.data = data;
    this.errors =
      errors instanceof Array
        ? errors
            .map((error) => {
              console.log(error);
              return this.__init(error);
            })
            .filter((omitNull) => Object.keys(omitNull).length)
        : !!error === true
        ? this.__init(error)
        : "Undefined Error";
  }
  __init(error) {
    return error;
  }
}
