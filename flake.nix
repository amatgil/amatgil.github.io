{
  description = "wasm-pack setup for s-ic-mulador";

  inputs = {
    nixpkgs = { url = "github:nixos/nixpkgs/nixos-unstable"; };
    rust-overlay = { url = "github:oxalica/rust-overlay"; };
  };

  outputs = { nixpkgs, rust-overlay, ... }:
    let system = "x86_64-linux";
    in {
      devShell.${system} = let
        pkgs = import nixpkgs {
          inherit system;
          overlays = [ rust-overlay.overlay ];
        };
      in (({ pkgs, ... }:
        pkgs.mkShell {
          buildInputs = with pkgs; [
            jekyll rubyPackages.webrick rubyPackages.jekyll-feed rubyPackages.jekyll-redirect-from

          ];

          shellHook = "";
        }) { pkgs = pkgs; });
    };
}
