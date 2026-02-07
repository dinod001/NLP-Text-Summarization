from textSummarizer.config.configuration import ConfigurationManager
from transformers import AutoTokenizer
from transformers import pipeline

class PredictionPipeline:
    _tokenizer = None
    _pipe = None

    def __init__(self):
        self.config = ConfigurationManager().get_model_evaluation_config()
        self._initialize()
    
    def _initialize(self):
        if PredictionPipeline._tokenizer is None:
            PredictionPipeline._tokenizer = AutoTokenizer.from_pretrained(self.config.tokenizer_path)
        
        if PredictionPipeline._pipe is None:
            PredictionPipeline._pipe = pipeline(
                "summarization", 
                model=self.config.model_path,
                tokenizer=PredictionPipeline._tokenizer
            )

    def predict(self, text):
        gen_kwargs = {"length_penalty": 0.8, "num_beams": 4, "max_length": 128}

        print("Dialogue:")
        print(text)

        output = PredictionPipeline._pipe(text, **gen_kwargs)[0]["summary_text"]
        
        # Clean output
        output = output.replace("<n>", " ").strip()
        
        print("\nModel Summary:")
        print(output)

        return output
