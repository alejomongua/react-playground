import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin'

export default {
    entry: './src/index.js',
    output: {
	path: path.resolve(__dirname, 'dist'),
	filename: '[name].js'
    },
    module: {
	rules: [
	    {
		test: /\.(js|jsx)$/,
		exclude: /node_modules/,
		use: {
		    loader: 'babel-loader'
		}
	    },
	    {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.svg$/,
        use: 'file-loader'
      },
      {
        test: /\.png$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              mimetype: 'image/png'
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [
      '.js',
      '.jsx'
    ],
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  },
  devServer: {
      contentBase: './dist',
      watchOptions: {
	  ignored: [
	      '**/*~',
	      '**/\.#*'
	  ]
      },
  },
  plugins: [
    new HtmlWebpackPlugin({
	template: 'src/index.html',
	favicon: 'src/favicon.ico',
      filename: 'index.html'
    }),
      new MiniCssExtractPlugin(),
      new CopyWebpackPlugin({
	  patterns: [
	      {
		  context: `${__dirname}/src/public`,
		  from: `*.*`
	      }
	  ]
      })
  ]
};
