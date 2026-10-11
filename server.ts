import {createRequestHandler} from 'react-router';
import * as serverBuild from 'virtual:react-router/server-build';

export default {
  async fetch(request: Request, _env: Env, executionContext: ExecutionContext): Promise<Response> {
    return createRequestHandler(serverBuild, process.env.NODE_ENV)(request, {waitUntil: executionContext.waitUntil.bind(executionContext)} as never);
  },
};
