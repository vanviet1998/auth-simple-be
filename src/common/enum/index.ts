export enum METHOD {
    GET = 'get',
    POST = 'post',
    PUT = 'put',
    DELETE = 'delete',
  }
  export enum AUTH_CONFIG_API {
    REQUIRED = 'true',
    NOT_REQUIRED = '',
  }
  
  export enum TYPE_USER {
    ADMIN = 'admin',
    USER = 'user',
  }
  
  export enum BAD_REQUEST_MESSAGE {
    USER_HAS_EXIT = 'USER_HAS_EXIT',
    CATEGORY_HAS_EXIT = 'CATEGORY_HAS_EXIT',
    USER_NAME_NOT_EXIT = 'USER_NAME_NOT_EXIT',
    PASSWORD_INVALID = 'PASSWORD_INVALID',
    DATA_NOT_FOUND = 'DATA_NOT_FOUND',
    PRODUCT_HAS_EXIT = 'PRODUCT_HAS_EXIT',
  
  }
  
  export enum INTERNAL_SERVER_ERROR_MESSAGE {
    SQL_RUNNING_ERROR = 'SQL_RUNNING_ERROR',
    SOME_THING_WENT_WRONG= 'SOME_THING_WENT_WRONG'
  }