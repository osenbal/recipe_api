// check permissions middleware
import { Request, Response, NextFunction } from "express";
import { RoleRepositoryImpl } from "@domain/repositories/role-repository";
import MYSQLDataSources from "@data/data-sources/mysql";
import { HTTP401Error } from "@domain/exeptions/error-exeption";

// require midleware vallidateAccessToken
const checkPermissions =
  (permissions: number) => async (req: any, res: any, next: any) => {
    const mysqlDataSource = MYSQLDataSources.getInstance();
    const roleRepository = new RoleRepositoryImpl(
      mysqlDataSource.getRoleDataSource()
    );
    try {
      const roleId: number = Number(req.body.roleId);
      const getRolePermission = await roleRepository.getRoleWithPermissionsById(
        roleId
      );
      const rolePermissionsId = getRolePermission?.dataValues?.permissions.map(
        (permission: any) => {
          return permission.id;
        }
      );

      if (!rolePermissionsId.includes(permissions)) {
        throw new HTTP401Error(
          "You are not authorized to access this endpoint"
        );
      }

      next();
    } catch (error) {
      next(error);
    }
  };

export default checkPermissions;
