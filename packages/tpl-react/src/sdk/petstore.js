/// <reference path='.petstore.d.ts' />

import fetch from "@36node/fetch";

export default class SDK {
  /**
   * Base url
   *
   * @returns {string} base url
   *  */
  get base() {
    return this.options.base || "";
  }

  /**
   * Sdk auth
   *
   * @returns {string} auth header
   * */
  get auth() {
    let token = this.options.token;
    if (typeof this.options.token === "function") {
      token = token();
    }
    if (token) {
      return `Bearer ${token}`;
    }
  }

  /**
   * Init store sdk
   *
   * @param {Object} opt
   * @param {string} opt.base  base url
   * @param {string} opt.token token fro authorization
   */
  constructor(opt = {}) {
    this.options = opt;
  }

  /**
   * pet's methods
   */
  pet = {
    /**
     * List all pets
     *
     * @param {ListPetsRequest} req ListPets request
     * @returns {Promise<ListPetsResponse>} A paged array of pets
     */
    listPets: req => {
      const { query, headers } = req;

      return fetch(`${this.base}/pets`, {
        method: "get",
        query,
        headers: { Authorization: this.auth, ...headers },
      });
    },
    /**
     * Create a pet
     *
     * @param {CreatePetsRequest} req ListPets request
     * @returns {Promise<CreatePetsResponse>} A paged array of pets
     */
    createPets: req => {
      const { headers, body } = req;

      if (!body) throw new Error("requetBody is required for createPets");

      return fetch(`${this.base}/pets`, {
        method: "post",
        body,
        headers: { Authorization: this.auth, ...headers },
      });
    },
    /**
     * Find pet by id
     *
     * @param {ShowPetByIdRequest} req ListPets request
     * @returns {Promise<ShowPetByIdResponse>} A paged array of pets
     */
    showPetById: req => {
      const { petId, headers } = req;

      if (!petId) throw new Error("petId is required for showPetById");

      return fetch(`${this.base}/pets/{petId}`, {
        method: "get",
        headers: { Authorization: this.auth, ...headers },
      });
    },
  };
}
