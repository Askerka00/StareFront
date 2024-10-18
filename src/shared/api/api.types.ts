/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export enum Error {
  BadRequest = "bad_request",
  Unauthorized = "unauthorized",
  Forbidden = "forbidden",
  NotFound = "not_found",
  TooManyRequests = "too_many_requests",
  UnprocessableEntity = "unprocessable_entity",
  InternalServerError = "internal_server_error",
}

/**
 * @format Id
 * @example "9826247a-c521-4838-b7d9-4ec36c58d3c9"
 */
export type Id = string;

/**
 * @format date-time
 * @example "2019-10-12T14:20:50.52+07:00"
 */
export type DateTimeRFC3339 = string;

/** @example "https://images.unsplash.com/photo-1682685797229-b2930538da47.jpg" */
export type Url = string;

export interface File {
  id: Id;
  url: Url;
  /** @example true */
  isStored: boolean;
}

/**
 * Some title
 * @example "Future"
 */
export type Title = string;

/**
 * Draft or Publish
 * @example "0"
 */
export type Status = number;

/**
 * First name
 * @example "John"
 */
export type FirstName = string;

/**
 * Last name
 * @example "Doe"
 */
export type LastName = string | null;

/**
 * Middle name
 * @example "Michael"
 */
export type MiddleName = string | null;

/**
 * Username
 * @example "vozdushno"
 */
export type Username = string;

/**
 * Email address
 * @format email
 * @example "some@email.com"
 */
export type Email = string;

/**
 * Phone number
 * @example "+375259876543"
 */
export type PhoneNumber = string;

/**
 * OTP code
 * @example "0123"
 */
export type Code = string;

/** @example "$ecretP@ssw0rd!" */
export type Password = string;

/**
 * @format json
 * @example {"time":1689439421439,"blocks":[{"id":"mhTl6ghSkV","type":"paragraph","data":{"text":"Hey. Meet the new Editor. On this picture you can see it in action. Then, try a demo 🤓"}},{"id":"l98dyx3yjb","type":"header","data":{"text":"Key features","level":3}}]}
 */
export type JSON = object;

export interface User {
  id: Id;
  /** Email address */
  email: Email;
}

export interface Profile {
  userId: Id;
  /** First name */
  firstName: FirstName;
  lastName: null | LastName;
  /** Username */
  username: Username;
  email: null | Email;
  avatarUrl: null | Url;
}

/** Start passwordless auth */
export interface PasswordlessEmailRequestData {
  /** Email address */
  email: Email;
}

/** Verify and authenticate user */
export interface VerifyCodeRequestData {
  code: string;
}

export type GetMeResponseData = User;

export type ProfilesGetOneResponseData = Profile;

export interface ProfilesCreateRequestData {
  userId: Id;
  /** @example "John" */
  firstName: string;
  /** @example "Doe" */
  lastName?: string;
  /** @example "some_awesome_username" */
  username?: string;
  avatarId?: Id;
}

export interface ProfilesUpdateRequestData {
  userId: Id;
  /** @example "John" */
  firstName?: string;
  /** @example "Doe" */
  lastName?: string;
  avatarId?: Id;
}

export interface MediaUploadRequestData {
  file: string;
}

export type MediaUploadResponseData = File;

export type MediaGetOneResponseData = File;

export interface MediaStoreRequestData {
  id: Id;
}

/** 201 Created */
export interface CreatedResponseData {
  id: Id;
}

/** @example null */
export type NoContentResponseData = null;

/**
 * 400 Bad Request
 * @example "bad_request"
 */
export type BadRequestResponseData = string;

/**
 * 401 Unauthorized
 * @example "unauthorized"
 */
export type UnauthorizedResponseData = string;

/**
 * 403 Forbidden
 * @example "forbidden"
 */
export type ForbiddenResponseData = string;

/**
 * 404 Not Found
 * @example "not_found"
 */
export type NotFoundResponseData = string;

/**
 * 429 Too Many Requests
 * @example "too_many_requests"
 */
export type TooManyRequestsResponseData = string;

/**
 * 422 Unprocessable Entity
 * @example "unprocessable_entity"
 */
export type UnprocessableEntityResponseData = string;

/**
 * 500 Internal Server Error
 * @example "internal_server_error"
 */
export type InternalServerErrorResponseData = string;

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown>
  extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "http://api.ulethai.local/storefront";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) =>
    fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter(
      (key) => "undefined" !== typeof query[key],
    );
    return keys
      .map((key) =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key),
      )
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.Text]: (input: any) =>
      input !== null && typeof input !== "string"
        ? JSON.stringify(input)
        : input,
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(
    params1: RequestParams,
    params2?: RequestParams,
  ): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (
    cancelToken: CancelToken,
  ): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(
      `${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`,
      {
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData
            ? { "Content-Type": type }
            : {}),
        },
        signal:
          (cancelToken
            ? this.createAbortSignal(cancelToken)
            : requestParams.signal) || null,
        body:
          typeof body === "undefined" || body === null
            ? null
            : payloadFormatter(body),
      },
    ).then(async (response) => {
      const r = response.clone() as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title ulethai — OpenAPI 3.0
 * @version 0.1.0
 * @baseUrl http://api.ulethai.local/storefront
 * @contact <hello@ulethai.com>
 *
 * This is a ulethai server based on the OpenAPI 3.0 specification.
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  auth = {
    /**
     * No description
     *
     * @tags auth
     * @name GetMe
     * @summary getMe
     * @request GET:/auth/getMe
     */
    getMe: (params: RequestParams = {}) =>
      this.request<
        GetMeResponseData,
        | BadRequestResponseData
        | UnauthorizedResponseData
        | NotFoundResponseData
        | UnprocessableEntityResponseData
        | TooManyRequestsResponseData
        | InternalServerErrorResponseData
      >({
        path: `/auth/getMe`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth
     * @name Logout
     * @summary logout
     * @request POST:/auth/logout
     */
    logout: (params: RequestParams = {}) =>
      this.request<
        NoContentResponseData,
        | BadRequestResponseData
        | UnauthorizedResponseData
        | ForbiddenResponseData
        | NotFoundResponseData
        | UnprocessableEntityResponseData
        | TooManyRequestsResponseData
        | InternalServerErrorResponseData
      >({
        path: `/auth/logout`,
        method: "POST",
        format: "json",
        ...params,
      }),
  };
  profiles = {
    /**
     * No description
     *
     * @tags profiles
     * @name GetOne
     * @summary getOne
     * @request GET:/profiles/getOne
     */
    getOne: (
      query: {
        /** userId */
        userId: Id;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        ProfilesGetOneResponseData,
        | BadRequestResponseData
        | UnauthorizedResponseData
        | ForbiddenResponseData
        | NotFoundResponseData
        | UnprocessableEntityResponseData
        | TooManyRequestsResponseData
        | InternalServerErrorResponseData
      >({
        path: `/profiles/getOne`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags profiles
     * @name Create
     * @summary create
     * @request POST:/profiles/create
     */
    create: (data: ProfilesCreateRequestData, params: RequestParams = {}) =>
      this.request<
        CreatedResponseData,
        | BadRequestResponseData
        | UnauthorizedResponseData
        | ForbiddenResponseData
        | NotFoundResponseData
        | UnprocessableEntityResponseData
        | TooManyRequestsResponseData
        | InternalServerErrorResponseData
      >({
        path: `/profiles/create`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags profiles
     * @name Update
     * @summary update
     * @request POST:/profiles/update
     */
    update: (data: ProfilesUpdateRequestData, params: RequestParams = {}) =>
      this.request<
        NoContentResponseData,
        | BadRequestResponseData
        | UnauthorizedResponseData
        | ForbiddenResponseData
        | NotFoundResponseData
        | UnprocessableEntityResponseData
        | TooManyRequestsResponseData
        | InternalServerErrorResponseData
      >({
        path: `/profiles/update`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  media = {
    /**
     * No description
     *
     * @tags media
     * @name Upload
     * @summary upload
     * @request POST:/media/upload
     */
    upload: (data: MediaUploadRequestData, params: RequestParams = {}) =>
      this.request<
        MediaUploadResponseData,
        | BadRequestResponseData
        | UnauthorizedResponseData
        | ForbiddenResponseData
        | NotFoundResponseData
        | UnprocessableEntityResponseData
        | TooManyRequestsResponseData
        | InternalServerErrorResponseData
      >({
        path: `/media/upload`,
        method: "POST",
        body: data,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags media
     * @name GetOne
     * @summary getOne
     * @request GET:/media/getOne
     */
    getOne: (
      query: {
        /** id */
        id: Id;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        MediaGetOneResponseData,
        | BadRequestResponseData
        | UnauthorizedResponseData
        | ForbiddenResponseData
        | NotFoundResponseData
        | UnprocessableEntityResponseData
        | TooManyRequestsResponseData
        | InternalServerErrorResponseData
      >({
        path: `/media/getOne`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags media
     * @name Store
     * @summary store
     * @request PATCH:/media/store
     */
    store: (data: MediaStoreRequestData, params: RequestParams = {}) =>
      this.request<
        NoContentResponseData,
        | BadRequestResponseData
        | UnauthorizedResponseData
        | ForbiddenResponseData
        | NotFoundResponseData
        | UnprocessableEntityResponseData
        | TooManyRequestsResponseData
        | InternalServerErrorResponseData
      >({
        path: `/media/store`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
}
