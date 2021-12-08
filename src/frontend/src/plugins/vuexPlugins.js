import JWTService from "@/services/jwt.service";
import { createResources } from "@/common/helpers/createResources";

export default function (store) {
  store.$jwt = JWTService;
  store.$api = createResources();
}
