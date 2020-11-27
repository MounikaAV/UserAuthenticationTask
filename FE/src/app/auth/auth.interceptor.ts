import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable } from "rxjs";
const TOKEN_HEADER_KEY = "authorization";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    var index = -1;
    index = request.url.indexOf("user");
    if (index > 0) {
      const token = sessionStorage.getItem('accesstoken')
      if (token) {
        request = request.clone({
          setHeaders: {
            'x-access-token': token,
            "Content-Type": "application/json",
          },
        });
        // request = request.clone({ url: `${BASE_PATH}${request.url}` });
        return next.handle(request);
      } else {
        return next.handle(request);
      }
    }
  }
}
