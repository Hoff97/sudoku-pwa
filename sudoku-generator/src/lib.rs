mod utils;

use wasm_bindgen::prelude::*;

use sudoku::Sudoku;
use sudoku::strategy::Strategy;

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

static VERY_EASY_STRATS: [Strategy; 1] = [Strategy::NakedSingles];

static EASY_STRATS: [Strategy; 3] = [Strategy::NakedSingles,
                                     Strategy::HiddenSingles,
                                     Strategy::LockedCandidates];

static MEDIUM_STRATS: [Strategy; 9] = [Strategy::NakedSingles,
                                       Strategy::HiddenSingles,
                                       Strategy::LockedCandidates,
                                       Strategy::NakedPairs,
                                       Strategy::NakedTriples,
                                       Strategy::NakedQuads,
                                       Strategy::HiddenPairs,
                                       Strategy::HiddenTriples,
                                       Strategy::HiddenQuads];

static HARD_STRATS: [Strategy; 16] = [Strategy::NakedSingles,
                                      Strategy::HiddenSingles,
                                      Strategy::LockedCandidates,
                                      Strategy::NakedPairs,
                                      Strategy::NakedTriples,
                                      Strategy::NakedQuads,
                                      Strategy::HiddenPairs,
                                      Strategy::HiddenTriples,
                                      Strategy::HiddenQuads,
                                      Strategy::XWing,
                                      Strategy::Swordfish,
                                      Strategy::Jellyfish,
                                      Strategy::XyWing,
                                      Strategy::XyzWing,
                                      Strategy::MutantSwordfish,
                                      Strategy::MutantJellyfish];

#[wasm_bindgen]
pub fn generate_sudoku_by_hardness(hardness: i32) -> std::string::String {
    let sudoku = match hardness {
        0 => Sudoku::generate_unique_strat(&VERY_EASY_STRATS),
        1 => Sudoku::generate_unique_strat(&EASY_STRATS),
        2 => Sudoku::generate_unique_strat(&MEDIUM_STRATS),
        _ => Sudoku::generate_unique_strat(&HARD_STRATS)
    };

    let st = format!("{}", sudoku);

    return st;
}

#[wasm_bindgen]
pub fn generate_sudoku_by_missing(miss: i32) -> std::string::String {
    let sudoku = Sudoku::generate_max_missing(miss);

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
