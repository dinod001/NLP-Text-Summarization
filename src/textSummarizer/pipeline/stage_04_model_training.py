from textSummarizer.config.configuration import ConfigurationManager
from textSummarizer.conponents.model_training import ModelTrainer

class ModelTrainingPipeline:
    
    def __init__(self) -> None:
        pass

    def main(self):
        try:
            config = ConfigurationManager()
            model_trainer_config = config.get_model_trainer_config()
            model_trainer_config = ModelTrainer(config=model_trainer_config)
            model_trainer_config.train()
        except Exception as e:
            raise e
