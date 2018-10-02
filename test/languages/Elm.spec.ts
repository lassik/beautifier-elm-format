import * as fs from "fs";
import * as path from "path";

import { newUnibeautify, Beautifier } from "unibeautify";
import beautifier from "../../src";
import { raw } from "../utils";

jest.setTimeout(10000);
describe("should successfully beautify Elm files", () => {
  // tslint:disable:mocha-no-side-effect-code
  testFile("Test.elm");
});

function testFile(fixtureFileName: string) {
  test(`should successfully beautify file ${fixtureFileName}`, () => {
    const text: string = fs
      .readFileSync(path.resolve(__dirname, `../fixtures/${fixtureFileName}`))
      .toString();
    const unibeautify = newUnibeautify();
    unibeautify.loadBeautifier(beautifier);
    return unibeautify
      .beautify({
        languageName: "Elm",
        options: {},
        text,
      })
      .then(results => {
        expect(raw(results)).toMatchSnapshot();
      });
  });
}