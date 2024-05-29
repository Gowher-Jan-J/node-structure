const Customer = {
  properties: {
    CustomerId: {
      $ref: "defs#/definitions/Customer/customerId",
    },
    name: {
      $ref: "defs#/definitions/Customer/name",
    },
    password: {
      $ref: "defs#/definitions/Customer/password",
    },
    email: {
      $ref: "defs#/definitions/Customer/email",
    },
    phone: {
      $ref: "defs#/definitions/Customer/phone",
    },
    gender: {
      $ref: "defs#/definitions/Customer/gender",
    },

    status: {
      $ref: "defs#/definitions/Customer/status",
    },
  },
};
const userAuth = {
  properties: {
    authId: {
      $ref: "defs#/definitions/userAuth/authId",
    },
    token: {
      $ref: "defs#/definitions/userAuth/token",
    },
    ipv4: {
      $ref: "defs#/definitions/userAuth/ipv4",
    },
    userAgent: {
      $ref: "defs#/definitions/userAuth/userAgent",
    },
  },
};

/**
 * @name  User
 */

export const CustomerCreate = {
  type: "object",
  $id: "CustomerCreate",
  additionalProperties: false,
  properties: {
    name: Customer.properties.name,
    password: Customer.properties.password,
    email: Customer.properties.email,
    phone: Customer.properties.phone,
    gender: Customer.properties.gender,
  },
  required: ["name", "password", "email", "phone", "gender"],
};
export const userLogin = {
  type: "object",
  $id: "userLogin",
  additionalProperties: false,
  properties: {
    name: Customer.properties.name,
    password: Customer.properties.password,
  },
  required: ["name", "password"],
};
