package controller

import (
	"github.com/golang/mock/gomock"
	"testing"
)

func getMockPostUseCase(t *testing.T) *MockPostUseCase {
	ctrl := gomock.NewController(t)
	defer ctrl.Finish()
	return NewMockPostUseCase(ctrl)
}

func getMockUserUseCase(t *testing.T) *MockPostUseCase {
	ctrl := gomock.NewController(t)
	defer ctrl.Finish()
	return NewMockPostUseCase(ctrl)
}

func getMockHelloWorldUseCase(t *testing.T) *MockHelloWorldUseCase {
	ctrl := gomock.NewController(t)
	defer ctrl.Finish()
	return NewMockHelloWorldUseCase(ctrl)
}
