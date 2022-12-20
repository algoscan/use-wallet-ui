import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import postcss from 'rollup-plugin-postcss';
import packageJson from "./package.json" assert { type: "json" };

export default [
	{
		input: "src/index.ts",
		output: [{
			file: packageJson.module,
			format: "es",
			sourcemap: true,
		}],
		plugins: [
			resolve(),
			commonjs(),
			typescript({ tsconfig: "./tsconfig.json" }),
			postcss({ extensions: [ '.css' ] }),
		],
		external: [...Object.keys(packageJson.peerDependencies)]
	},
	{
		input: "dist/types/index.d.ts",
		output: [{ file: "dist/index.d.ts", format: "es" }],
		plugins: [dts()],
		external: [/\.s?css$/] 
	},
];