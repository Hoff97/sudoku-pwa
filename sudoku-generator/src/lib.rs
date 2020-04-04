mod utils;

use wasm_bindgen::prelude::*;

use sudoku::Sudoku;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
extern {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub fn generate_sudoku() -> std::string::String {
    let sudoku = Sudoku::generate_unique();

    let st = format!("{}", sudoku);

    return st;
}

#[wasm_bindgen]
pub fn solve_sudoku(s: &str) -> std::string::String {
    let sudoku = Sudoku::from_str_line(s).unwrap();

    if let Some(solution) = sudoku.solve_unique() {
        let st = format!("{}", solution);

        return st;
    }
    let st = format!("{}", sudoku);

    return st;
}
