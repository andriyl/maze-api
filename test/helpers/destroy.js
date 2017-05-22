const models = require('../../src/models');

module.exports = async function destroy() {
  await models.Profiles.destroy({
    force: true,
    where: {}
  });

  await models.Projects.destroy({
    force: true,
    where: {}
  });
};
