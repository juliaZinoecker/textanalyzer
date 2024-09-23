export interface TextAnalyzerInput {
    modus : string,
    text : string
}

export interface TextAnalyzerOutput {
    timestamp : string,
    originalText : string,
    analyzedText : string[]
}
