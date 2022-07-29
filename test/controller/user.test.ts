import { Application, Framework } from "@midwayjs/koa"
import { close, createApp, createHttpRequest } from "@midwayjs/mock"
import {UserService} from "../../src/service/user.service"

describe("test/controller/user.test.ts", () => {

  let app: Application;

  const presetUser = {
    username: "jack",
    password: "redballoon",
  }

  beforeAll(async () => {
    app = await createApp<Framework>();
    const container = app.getApplicationContext()
    const userService = container.get(UserService)
    try{
      await userService.registerUser(presetUser.username, presetUser.password);
    }catch(e){
      app.getLogger().warn(e);
    }
  })

  afterAll(async () => {
    await close(app)
  })

  it("user login success", async () => {
    const start = Date.now();

    const result = await createHttpRequest(app).post("/api/user/login", ).send(presetUser);
    const end = Date.now();
    expect(result.status).toBe(200);
    expect(result.body).toEqual(
      expect.objectContaining({
        code: 200,
        result: "success",
        message: "登录成功",
        data: expect.objectContaining({
          token: expect.any(String),
        })
      })
    )
    expect(end - start).toBeLessThanOrEqual(1e3);
  })

  it("user login failed", async () => {
    const start = Date.now();
    const result = await createHttpRequest(app).post('/api/user/login', ).send({
      ...presetUser,
      password: "failed password",
    });
    const end = Date.now();
    expect(result.status).toBe(200);
    expect(result.body).toEqual(
      expect.objectContaining({
        code: 400,
        result: "error",
        message: "账号或密码不正确",
      }),
    )

    expect(end - start).toBeLessThanOrEqual(1e3);
  })
})