const models = require('../models');

const attributes = [
  'name',
  'handle',
  'about',
  'title',
  'contacts',
  'social',
  'addresses',
  'birthday',
  'createdAt',
  'joinedAt'
];

const include = [{
  model: models.Profiles,
  as: 'boss',
  attributes: ['name', 'handle']
}];

/**
 * Controller for the "/profiles" paths
 */
module.exports = class Profile {
  /**
   * Specify request context
   * @param {Object} context
   */
  constructor(context) {
    this.context = context;
  }

  /**
   * Get all profiles
   * @return {Promise}
   */
  async all() {
    const profiles = await models.Profiles.findAll({
      attributes, include
    });

    return profiles;
  }

  /**
   * Get specific profile
   * @param {string} handle
   * @return {Promise}
   */
  async get(handle) {
    const where = { handle };

    return models.Profiles.findOne({
      where, include, attributes
    });
  }

  /**
   * Delete specific profile
   * @param {string} handle
   * @return {Boolean} - whenever or not action was performed
   */
  async delete(handle) {
    await models.Profiles.destroy({
      where: {
        handle
      }
    });

    return true;
  }

  /**
   * Create profile
   * @param {Object} data - profile data
   * @return {Boolean} - whenever or not action was performed
   */
  async create(data) {
    await models.Profiles.create(data);

    return true;
  }

  /**
   * Update the specific profile
   * @param {string} handle
   * @param {object} data - new profile data
   * @return {string} response type - "created" | "updated"
   */
  async update(handle, data) {
    // So method wouldn't became destructive
    data = Object.assign({}, data);

    const profile = await models.Profiles.findOne({
      where: { handle }
    });

    // If there is no profile - create one,
    // that's what concepts of REST tell us
    if (profile == null) {
      // Handle needs to be present for create request
      data.handle = handle;

      await this.create(data);
      return 'created';
    }

    // We can't allow `handle` to be updated
    // since its used all over the place.
    delete data.handle;

    // Check if record exists in db
    await profile.update(data);
    return 'updated';
  }
};
