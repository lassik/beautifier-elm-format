import {
  Beautifier,
  BeautifierBeautifyData,
  DependencyType,
  ExecutableDependency,
} from "unibeautify";
import * as readPkgUp from "read-pkg-up";
import options from "./options";

const { pkg } = readPkgUp.sync({ cwd: __dirname });
export const beautifier: Beautifier = {
  name: "elm-format",
  package: pkg,
  dependencies: [
    {
      type: DependencyType.Executable,
      name: "elm-format",
      program: "elm-format",
      // parseVersion: [],
      homepageUrl: "https://github.com/avh4/elm-format",
      installationUrl: "https://github.com/avh4/elm-format#installation-",
      bugsUrl: "https://github.com/avh4/elm-format/issues",
      badges: [],
    },
  ],
  options: {
    Elm: {},
  },
  beautify({
    text,
    options,
    filePath,
    projectPath,
    dependencies,
    beautifierConfig,
  }: BeautifierBeautifyData) {
    const elmFormat = dependencies.get<ExecutableDependency>("elm-format");
    const args = ["--yes", "--stdin"];
    return elmFormat
      .run({ args, stdin: text, options: {} })
      .then(({ exitCode, stderr, stdout }) => {
        if (exitCode) {
          return Promise.reject(stderr);
        }
        return Promise.resolve(stdout);
      });
  },
};
export default beautifier;
