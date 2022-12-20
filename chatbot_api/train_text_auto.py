import torch
import numpy as np
from torch import nn, optim
from torch.utils.data import DataLoader
from model.text_auto_model import TextAuto
from datasets.tet_auto_dataset import Dataset
from model.automated_text import TextGenerate

def train(dataset, batch_size, max_epochs):
    model = TextAuto(data)
    model.train()

    dataloader = DataLoader(dataset, batch_size=batch_size)
    criterion = nn.CrossEntropyLoss()
    optimizer = optim.Adam(model.parameters(), lr=0.001)

    for epoch in range(max_epochs):
        state_h, state_c = model.init_state(dataset.sequence_length)

        for batch, (x, y) in enumerate(dataloader):
            optimizer.zero_grad()

            y_pred, (state_h, state_c) = model(x, (state_h, state_c))
            loss = criterion(y_pred.transpose(1, 2), y)

            state_h = state_h.detach()
            state_c = state_c.detach()

            loss.backward()
            optimizer.step()

            print({ 'epoch': epoch, 'batch': batch, 'loss': loss.item() })
    return model

if __name__ == "__main__":
    data = Dataset(
        sequence_length = 4
    )

    model = train(
        dataset=data,
        batch_size=256,
        max_epochs=10
    )

    FILE = "auto_text.pth"
    torch.save(model, FILE)

    auto_text = TextGenerate(data, model)
    print(auto_text('Knock knock. Whos there?'))