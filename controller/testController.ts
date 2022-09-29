import { Controller, Post, Get } from '../decorators/Controller';
import { Body, Query } from '../decorators/Parameters';

// @ts-nocheck
@Controller('/test')
export class TestController {
    @Post('/post')
    test(@Body() param: any) {
        return {
            from: '/test/post',
            body: param
        };
    }

    @Get('/get')
    async test12(@Query() param: any) {
        return {
            from: '/test/get',
            param: param
        };
    }
}
