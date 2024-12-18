{
  pkgs ? import <nixpkgs> { },
  lib,
}:
let
  packages = with pkgs; [
    jekyll 
    rubyPackages.webrick
    rubyPackages.jekyll-feed
    rubyPackages.jekyll-redirect-from
    bundler

    elmPackages.elm
    elmPackages.elm-language-server
#uglify-js
  ];
in
pkgs.mkShell {
  # Get dependencies from the main package
  nativeBuildInputs = packages;
  buildInputs = packages;
  env = {
    LIBCLANG_PATH = "${pkgs.libclang.lib}/lib";
    LD_LIBRARY_PATH = "${lib.makeLibraryPath packages}";
  };
}
