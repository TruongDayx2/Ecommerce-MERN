from model.automated_text import TextGenerate
from datasets.tet_auto_dataset import Dataset
import torch

#torch load auto_text.pth
model = torch.load('auto_text.pth')
data = Dataset(
        sequence_length = 4
    )

auto_text = TextGenerate(data, model)
out = auto_text.predict('what was that')

print(out)