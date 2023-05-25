package com.wheelpicker;

import java.util.Map;

final class LoopRunnable implements Runnable {

    final LoopView loopView;

    LoopRunnable(LoopView loopview) {
        super();
        loopView = loopview;

    }

    @Override
    public final void run() {
        LoopListener listener = loopView.loopListener;
        Map selectedItem = LoopView.getSelectedItem(loopView);
        int currentIndex = LoopView.getCurrentIndex(loopView);
        listener.onItemSelect(loopView, selectedItem, currentIndex);
    }
}
