# String Compression Comparison

This repo is provided to show a comparison between string compression algorithms and libraries.

[View the tables](https://justinformentin.github.io/string-compression-comparison/)

![Screenshot](/screenshot.jpg)

You can compare the compression speed, decompression speed, size of output, the size of the output as a percent of the input, and the library/algorithm size.

You can uncheck individual libraries to remove them from the comparison.

Black cells mean the decompressed string does not match the original input string, so it is unusable.

## Contributing

### Functions
If you would like to add more functions, either include them in the [local-libs](/local-libs/) directory, or `npm install` them. And then add them to the list in the [/benchmarks/shared/funcs.ts](/benchmarks/shared/funcs.ts) file.

### Data
If you would like to add more test data, add it to the [data](/data/) directory. Then add them to the list in [/benchmarks/shared/data.ts](/benchmarks/shared/data.ts) file.

### Run
Run `npm run build-all` to run the scripts that get the compression and decompression stats, and then merges the data into a single file that is used on the frontend.

## Why

Read the full article here: [String Compression](https://justinformentin.com/string-compression)

This started as a personal investigation for my notetaking app, [Knoat](https://knoat.com). I was looking into using the [Lexical](https://github.com/facebook/lexical) editor.

But the output `.lexical` files are very large - multi-KB JSON for even a few lines of text.

Someone else had already written a very good minifier - [Lexical Minifier](https://github.com/fedemartinm/lexical-minifier)

But, seeing the result of the minifier, I thought there were still a lot of repeated characters, which lead me to compression. 

## More

If you're interested, you can read more about the [Huffman and Lempel-Ziv-Welch](https://web.mit.edu/6.02/www/s2012/handouts/3.pdf) compression algorithms, or [Lossless Compression](https://en.wikipedia.org/wiki/Lossless_compression) in general, with an interesting note on legal issues regarding the LZW algorithm.

