import esbuild from "esbuild";
const formats = ["esm", "cjs"];

function build() {
  formats.forEach((v) => {
    esbuild
      .build({
        entryPoints: ["src/index.ts"],
        outdir: "dist",
        outExtension: {
          ".js": v == "esm" ? ".mjs" : ".cjs",
        },
        target: "es6",
        format: v,
        bundle: true,
        minify: true,
        sourcemap: false,
        sourcesContent: false,
        logLevel: "silent",
      })
      .catch((err) => {
        // eslint-disable-next-line no-undef
        console.log(err);
      });
  });
}

build();
