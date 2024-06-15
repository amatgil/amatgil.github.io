{
  description = "wasm-pack setup for s-ic-mulador";

  inputs = {
    nixpkgs = { url = "github:nixos/nixpkgs/nixos-unstable"; };
  };

  outputs = { self, nixpkgs }:
    let system = "x86_64-linux";
    in {
      devShell.${system} = let
        pkgs = import nixpkgs { inherit system; };
      in (({ pkgs, ... }:
        pkgs.mkShell {
          buildInputs = with pkgs; [
            jekyll 
            rubyPackages.webrick
            rubyPackages.jekyll-feed
            rubyPackages.jekyll-redirect-from
            bundler

          ];

          shellHook = "";
        }) { pkgs = pkgs; });
    };
}
