package model

import (
	"github.com/oklog/ulid"
	"math/rand"
	"time"
)

func GenerateID() ulid.ULID {
	t := time.Now()
	return ulid.MustNew(ulid.Timestamp(t), ulid.Monotonic(rand.New(rand.NewSource(t.UnixNano())), 0))
}
