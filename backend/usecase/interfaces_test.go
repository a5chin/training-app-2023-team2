package usecase

import (
	"github.com/golang/mock/gomock"
	"testing"
)

func getMockPostRepo(t *testing.T) *MockPostRepo {
	ctrl := gomock.NewController(t)
	defer ctrl.Finish()
	return NewMockPostRepo(ctrl)
}

func getMockUserRepo(t *testing.T) *MockPostRepo {
	ctrl := gomock.NewController(t)
	defer ctrl.Finish()
	return NewMockPostRepo(ctrl)
}

func getMockHelloWorldRepo(t *testing.T) *MockHelloWorldRepo {
	ctrl := gomock.NewController(t)
	defer ctrl.Finish()
	return NewMockHelloWorldRepo(ctrl)
}
