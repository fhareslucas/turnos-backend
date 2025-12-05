export async function up(queryInterface, Sequelize) {
  await queryInterface.removeConstraint("turno", "turno_codigo_key");
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.addConstraint("turno", {
    fields: ["codigo"],
    type: "unique",
    name: "turno_codigo_key",
  });
}
