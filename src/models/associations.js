import SeccionProducto from "./seccion_producto.js";
import MarcaProducto from "./marca_producto.js";
import ColorProducto from "./color_producto.js";
import EstadoProducto from "./estado_producto.js";
import DetalleOrden from "./detalle_orden.js";
import Orden from "./orden.js";
import Producto from "./producto.js";
import Busquedas from "./busquedas.js";

Orden.hasMany(DetalleOrden, { foreignKey: "det_fk_orden" });
DetalleOrden.belongsTo(Orden, { foreignKey: "det_fk_orden" });
DetalleOrden.belongsTo(Producto, {
  foreignKey: "det_fk_producto",
  as: "producto",
});
Producto.hasMany(DetalleOrden, { foreignKey: "det_fk_producto" });
Busquedas.belongsTo(Producto, {
  foreignKey: "pdc_id",
  as: "producto",
  onDelete: "CASCADE",
});
Producto.belongsTo(SeccionProducto, {
  foreignKey: "pdc_fk_seccion",
  as: "SeccionProducto",
});

Producto.belongsTo(MarcaProducto, {
  foreignKey: "pdc_fk_marca",
  as: "MarcaProducto",
});
Producto.belongsTo(ColorProducto, {
  foreignKey: "pdc_fk_color",
  as: "ColorProducto",
});
Producto.belongsTo(EstadoProducto, {
  foreignKey: "pdc_estado",
  as: "EstadoProducto",
});
