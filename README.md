# NLP-Text-Summarization

## Workflows

1. Update `config.yaml`

   - Define paths, artifacts, and environment-level configurations.
2. Update `params.yaml`

   - Store model hyperparameters and training-related values.
3. Update entity

   - Define data classes / schemas for configuration objects.
4. Update the Configuration Manager (`src/config`)

   - Read `config.yaml` and `params.yaml`
   - Return structured configuration objects using entities.
5. Update the components

   - Implement core logic (data ingestion, validation, training, evaluation, etc.)
   - Each component should consume configs from the configuration manager.
6. Update the pipeline

   - Orchestrate components in the correct order
   - Handle end-to-end workflow execution.
7. Update `main.py`

   - Entry point for running the pipeline
   - Trigger training / evaluation workflows.
8. Update `app.py`

   - Expose the pipeline through an API (FastAPI)
   - Handle user requests and return predictions/results.
