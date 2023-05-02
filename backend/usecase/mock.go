// Code generated by MockGen. DO NOT EDIT.
// Source: interfaces.go

// Package usecase is a generated GoMock package.
package usecase

import (
	context "context"
	entity "myapp/entity"
	reflect "reflect"

	gomock "github.com/golang/mock/gomock"
)

// MockHelloWorldRepo is a mock of HelloWorldRepo interface.
type MockHelloWorldRepo struct {
	ctrl     *gomock.Controller
	recorder *MockHelloWorldRepoMockRecorder
}

// MockHelloWorldRepoMockRecorder is the mock recorder for MockHelloWorldRepo.
type MockHelloWorldRepoMockRecorder struct {
	mock *MockHelloWorldRepo
}

// NewMockHelloWorldRepo creates a new mock instance.
func NewMockHelloWorldRepo(ctrl *gomock.Controller) *MockHelloWorldRepo {
	mock := &MockHelloWorldRepo{ctrl: ctrl}
	mock.recorder = &MockHelloWorldRepoMockRecorder{mock}
	return mock
}

// EXPECT returns an object that allows the caller to indicate expected use.
func (m *MockHelloWorldRepo) EXPECT() *MockHelloWorldRepoMockRecorder {
	return m.recorder
}

// GetHelloWorld mocks base method.
func (m *MockHelloWorldRepo) GetHelloWorld(ctx context.Context, lang string) (*entity.HelloWorld, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "GetHelloWorld", ctx, lang)
	ret0, _ := ret[0].(*entity.HelloWorld)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// GetHelloWorld indicates an expected call of GetHelloWorld.
func (mr *MockHelloWorldRepoMockRecorder) GetHelloWorld(ctx, lang interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "GetHelloWorld", reflect.TypeOf((*MockHelloWorldRepo)(nil).GetHelloWorld), ctx, lang)
}

// MockPostRepo is a mock of PostRepo interface.
type MockPostRepo struct {
	ctrl     *gomock.Controller
	recorder *MockPostRepoMockRecorder
}

// MockPostRepoMockRecorder is the mock recorder for MockPostRepo.
type MockPostRepoMockRecorder struct {
	mock *MockPostRepo
}

// NewMockPostRepo creates a new mock instance.
func NewMockPostRepo(ctrl *gomock.Controller) *MockPostRepo {
	mock := &MockPostRepo{ctrl: ctrl}
	mock.recorder = &MockPostRepoMockRecorder{mock}
	return mock
}

// EXPECT returns an object that allows the caller to indicate expected use.
func (m *MockPostRepo) EXPECT() *MockPostRepoMockRecorder {
	return m.recorder
}

// GetPostByID mocks base method.
func (m *MockPostRepo) GetPostByID(ctx context.Context, id int) (*entity.Post, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "GetPostByID", ctx, id)
	ret0, _ := ret[0].(*entity.Post)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// GetPostByID indicates an expected call of GetPostByID.
func (mr *MockPostRepoMockRecorder) GetPostByID(ctx, id interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "GetPostByID", reflect.TypeOf((*MockPostRepo)(nil).GetPostByID), ctx, id)
}

// GetPosts mocks base method.
func (m *MockPostRepo) GetPosts(ctx context.Context, limit, offset *int) ([]*entity.Post, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "GetPosts", ctx, limit, offset)
	ret0, _ := ret[0].([]*entity.Post)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// GetPosts indicates an expected call of GetPosts.
func (mr *MockPostRepoMockRecorder) GetPosts(ctx, limit, offset interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "GetPosts", reflect.TypeOf((*MockPostRepo)(nil).GetPosts), ctx, limit, offset)
}

// MockUserRepo is a mock of UserRepo interface.
type MockUserRepo struct {
	ctrl     *gomock.Controller
	recorder *MockUserRepoMockRecorder
}

// MockUserRepoMockRecorder is the mock recorder for MockUserRepo.
type MockUserRepoMockRecorder struct {
	mock *MockUserRepo
}

// NewMockUserRepo creates a new mock instance.
func NewMockUserRepo(ctrl *gomock.Controller) *MockUserRepo {
	mock := &MockUserRepo{ctrl: ctrl}
	mock.recorder = &MockUserRepoMockRecorder{mock}
	return mock
}

// EXPECT returns an object that allows the caller to indicate expected use.
func (m *MockUserRepo) EXPECT() *MockUserRepoMockRecorder {
	return m.recorder
}
